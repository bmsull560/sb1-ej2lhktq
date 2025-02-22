import { motion } from 'framer-motion';
import { Phone, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DoNotCallRegistration() {
  return (
    <div className="space-y-6">
      {/* Registration Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-500" />
            Register Your Number
          </h3>
          <p className="text-gray-400 mb-6">
            Add your phone number to the National Do Not Call Registry to reduce unwanted telemarketing calls.
          </p>
          <Button
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={() => window.open('https://www.donotcall.gov/register.html', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Go to Registration Page
          </Button>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Verify Registration
          </h3>
          <p className="text-gray-400 mb-6">
            Check if your phone number is already registered on the National Do Not Call Registry.
          </p>
          <Button
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={() => window.open('https://www.donotcall.gov/verify.html', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Verify Your Number
          </Button>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Important Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              Registration is completely free and never expires
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              Your registration will be effective within 31 days of your registration date
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              Both landline and mobile numbers can be registered
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              Some organizations (charities, political groups, and companies you've done business with) may still be allowed to call
            </p>
          </div>
        </div>
      </div>

      {/* Report Violations */}
      <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Report Violations</h3>
        <p className="text-gray-400 mb-6">
          If you receive unwanted calls after your number has been on the registry for 31 days, you can file a complaint.
        </p>
        <Button
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={() => window.open('https://www.donotcall.gov/report.html', '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          File a Complaint
        </Button>
      </div>
    </div>
  );
}