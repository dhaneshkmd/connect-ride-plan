import { useState } from 'react';
import { AlertCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface EmergencyButtonProps {
  tripId: string;
}

const EmergencyButton = ({ tripId }: EmergencyButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleEmergency = () => {
    // In a real app, this would:
    // 1. Notify emergency services
    // 2. Alert emergency contacts
    // 3. Send GPS location
    // 4. Alert the support team
    
    toast.error('Emergency alert sent!', {
      description: 'Support team has been notified. Stay safe.',
      duration: 10000,
    });
    
    console.log('Emergency triggered for trip:', tripId);
    setShowDialog(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        className="w-full"
        onClick={() => setShowDialog(true)}
      >
        <AlertCircle className="mr-2 h-5 w-5" />
        Emergency SOS
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              Emergency Alert
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>This will immediately:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Alert our 24/7 support team</li>
                <li>Send your location to emergency services</li>
                <li>Notify your emergency contacts</li>
                <li>Record trip details for authorities</li>
              </ul>
              <p className="font-semibold mt-4">
                Only press this button in case of a real emergency.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEmergency}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Phone className="mr-2 h-4 w-4" />
              Trigger Emergency
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmergencyButton;
