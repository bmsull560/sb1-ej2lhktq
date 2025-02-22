# Do Not Call List Registration Script

This script helps automate the data collection process for registering phone numbers with the National Do Not Call Registry.

## Features

- Validates phone numbers and email addresses
- Supports multiple phone number registration
- Saves registration data for record keeping
- Interactive command-line interface
- Provides clear next steps for completing registration

## Usage

1. Run the script:
   ```bash
   python src/scripts/do_not_call_register.py
   ```

2. Follow the interactive prompts to:
   - Add phone numbers
   - Set email address
   - Review registration information
   - Save registration data

3. After saving, visit https://www.donotcall.gov/register.html to complete the official registration.

## Important Notes

- Registration on the Do Not Call List is FREE
- Your registration will be effective within 31 days of your registration date
- Your registration will not expire
- The Do Not Call Registry accepts registrations from both cell phones and landlines
- You can register up to three phone numbers at once (landline or mobile)

## Privacy & Security

- This script stores registration data locally
- No data is automatically submitted to the Do Not Call Registry
- You must complete the final registration step on the official website

## Requirements

- Python 3.6 or higher
- No additional dependencies required