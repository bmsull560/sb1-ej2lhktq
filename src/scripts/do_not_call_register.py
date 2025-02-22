import re
from datetime import datetime
import json
import sys
import os

class DoNotCallRegistration:
    def __init__(self):
        self.data = {
            'phone_numbers': [],
            'email': '',
            'registration_type': 'personal'  # or 'business'
        }
        
    def validate_phone(self, phone):
        """Validate phone number format."""
        # Remove any non-digit characters
        phone = re.sub(r'\D', '', phone)
        
        # Check if it's exactly 10 digits
        if len(phone) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
            
        return phone
    
    def validate_email(self, email):
        """Validate email format."""
        email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        if not email_pattern.match(email):
            raise ValueError("Invalid email format")
        return email
    
    def add_phone_number(self, phone):
        """Add a phone number to the registration."""
        try:
            validated_phone = self.validate_phone(phone)
            if validated_phone not in self.data['phone_numbers']:
                self.data['phone_numbers'].append(validated_phone)
                print(f"Added phone number: {self.format_phone(validated_phone)}")
            else:
                print("Phone number already added")
        except ValueError as e:
            print(f"Error: {e}")
    
    def set_email(self, email):
        """Set the email address for registration confirmation."""
        try:
            validated_email = self.validate_email(email)
            self.data['email'] = validated_email
            print(f"Email set to: {validated_email}")
        except ValueError as e:
            print(f"Error: {e}")
    
    def format_phone(self, phone):
        """Format phone number for display."""
        return f"({phone[:3]}) {phone[3:6]}-{phone[6:]}"
    
    def save_registration(self):
        """Save registration data to a file."""
        if not self.data['phone_numbers'] or not self.data['email']:
            print("Error: Both phone number(s) and email are required")
            return False
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"registration_{timestamp}.json"
        
        try:
            with open(filename, 'w') as f:
                json.dump(self.data, f, indent=2)
            print(f"\nRegistration data saved to {filename}")
            return True
        except Exception as e:
            print(f"Error saving registration: {e}")
            return False
    
    def print_registration_info(self):
        """Print current registration information."""
        print("\nCurrent Registration Information:")
        print("-" * 30)
        print(f"Email: {self.data['email']}")
        print("Phone Numbers:")
        for phone in self.data['phone_numbers']:
            print(f"  • {self.format_phone(phone)}")
        print("-" * 30)
    
    def interactive_registration(self):
        """Run interactive registration process."""
        print("Do Not Call List Registration")
        print("=" * 30)
        
        while True:
            print("\nOptions:")
            print("1. Add phone number")
            print("2. Set email address")
            print("3. View current information")
            print("4. Save and submit registration")
            print("5. Exit")
            
            choice = input("\nEnter your choice (1-5): ")
            
            if choice == '1':
                phone = input("Enter phone number (10 digits): ")
                self.add_phone_number(phone)
            
            elif choice == '2':
                email = input("Enter email address: ")
                self.set_email(email)
            
            elif choice == '3':
                self.print_registration_info()
            
            elif choice == '4':
                if self.save_registration():
                    print("\nIMPORTANT: Next Steps")
                    print("1. Visit https://www.donotcall.gov/register.html")
                    print("2. Enter the phone number(s) and email from the saved registration file")
                    print("3. Complete the registration process on the website")
                    print("\nNote: Your registration will be effective within 31 days of your registration date")
                    break
            
            elif choice == '5':
                print("Exiting registration process")
                break
            
            else:
                print("Invalid choice. Please try again.")

def main():
    registration = DoNotCallRegistration()
    registration.interactive_registration()

if __name__ == "__main__":
    main()