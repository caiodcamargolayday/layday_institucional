"use client";

import { Button } from "@/components/ui/button";
import { openCloudbedsBooking, CLOUDBEDS_CONFIG, VenueKey } from "@/lib/tracking";

interface HotelBookingButtonProps {
  hotelId: string;
  className?: string;
  children: React.ReactNode;
}

export function HotelBookingButton({ hotelId, className, children }: HotelBookingButtonProps) {
  const handleClick = () => {
    if (hotelId === "1") {
      openCloudbedsBooking("canggu");
    } else if (hotelId === "18") {
      openCloudbedsBooking("gilit");
    } else if (hotelId === "20") {
      openCloudbedsBooking("coday");
    } else if (hotelId === "17") {
      // Lay Day Uluwatu (Sentec)
      openCloudbedsBooking("uluwatu");
    } else {
      openCloudbedsBooking("canggu");
    }
  };

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}
