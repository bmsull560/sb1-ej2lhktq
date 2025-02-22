import json
import os
from supabase import create_client, Client

def import_privacy_tools():
    # Initialize Supabase client
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_ANON_KEY')
    
    if not supabase_url or not supabase_key:
        print("Error: Missing Supabase credentials")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    try:
        # Load scraped data
        with open('privacy_tools_data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Import categories
        print("Importing categories...")
        for slug, category in data['categories'].items():
            result = supabase.table('tool_categories').insert({
                'name': category['name'],
                'description': category['description'],
                'slug': slug,
                'icon': None  # Icons will need to be set manually
            }).execute()
            
            if hasattr(result, 'error') and result.error:
                print(f"Error importing category {category['name']}: {result.error}")
        
        # Get category IDs
        categories = supabase.table('tool_categories').select('id, slug').execute()
        category_map = {cat['slug']: cat['id'] for cat in categories.data}
        
        # Import tools
        print("Importing tools...")
        for tool in data['tools']:
            category_id = category_map.get(tool['category_slug'])
            if not category_id:
                print(f"Warning: No category found for tool {tool['name']}")
                continue
            
            result = supabase.table('privacy_tools').insert({
                'category_id': category_id,
                'name': tool['name'],
                'description': tool['description'],
                'url': tool['url'],
                'github_url': tool['github_url'],
                'license': tool['license'],
                'is_open_source': tool['is_open_source'],
                'is_free': tool['is_free'],
                'has_paid_plan': tool['has_paid_plan'],
                'platforms': tool['platforms'],
                'tags': tool['tags']
            }).execute()
            
            if hasattr(result, 'error') and result.error:
                print(f"Error importing tool {tool['name']}: {result.error}")
        
        print("Import completed successfully!")
        
    except Exception as e:
        print(f"Error during import: {str(e)}")

if __name__ == "__main__":
    import_privacy_tools()