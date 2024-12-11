"use client";
 
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppointmentDetails, CalendarAppointment } from "./calendar-appointment";
import { extractAppointment } from "./actions";
 
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] =
    useState<AppointmentDetails | null>(null);
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const input = formData.get("appointment") as string;
    const appointment = await extractAppointment(input);

    console.log("XXX"+appointment);


    setAppointment(appointment);
    setLoading(false);
  };
 
  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic period weeks</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="appointment"
                placeholder="Enter start date and duration..."
                className="w-full"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <CalendarAppointment appointment={appointment} />
      </div>
    </div>
  );
}