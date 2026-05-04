"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, CalendarIcon, Users } from "lucide-react";
import { motion } from "framer-motion";

export function SearchTool() {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("1");
  const [promo, setPromo] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto px-4 -mt-16 relative z-20"
    >
      <Card className="p-4 shadow-2xl bg-white/95 backdrop-blur-lg border-0 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Destination / Hostel</label>
            <Select value={location} onValueChange={(val) => setLocation(val || "")}>
              <SelectTrigger className="w-full border-gray-300 h-12">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Select Destination" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="canggu">Lay Day Canggu</SelectItem>
                <SelectItem value="uluwatu">Lay Day Uluwatu</SelectItem>
                <SelectItem value="gili-t">Lay Day Gili T</SelectItem>
                <SelectItem value="coday">CoDay Uluwatu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Check-in - Check-out</label>
            <Button variant="outline" className="w-full border-gray-300 h-12 justify-start text-left font-normal text-gray-600">
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span>Select Dates</span>
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Guests</label>
            <Select value={guests} onValueChange={(val) => setGuests(val || "1")}>
              <SelectTrigger className="w-full border-gray-300 h-12">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Guests" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Guest{num > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Promo Code</label>
            <Input 
              placeholder="Promo code" 
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="h-12 border-gray-300"
            />
          </div>

          <Button className="w-full h-12 bg-black hover:bg-black/80 text-white font-bold uppercase tracking-wider">
            Search
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
