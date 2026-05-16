"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";

export function BookingCancelAlert({booking}) {
    const handleCancelBooking = async () => {
        const res = await fetch(`http://localhost:5000/booking/${booking._id}`,{
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await res.json()
        if(data){
            toast.success(`Booking of ${booking.destinationName} has been cancelled.`)
        }
        window.location.reload();

    }
    return (
        <AlertDialog>
            <Button variant='danger-soft' className={'rounded-none'}><BiTrash />Cancel</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel Booking?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently cancel <strong>{booking.destinationName}</strong> booking and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleCancelBooking} slot="close" variant="danger">
                                Cancel Booking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}