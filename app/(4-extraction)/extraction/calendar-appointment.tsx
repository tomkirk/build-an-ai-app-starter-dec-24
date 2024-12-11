import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
export interface AppointmentDetails {
  academic_period: string
  academic_period_weeks: Array<{
    number: string
    startDate: string | null
    endDate: string | null
    dayCount: number | null
  }> | null
}

interface CalendarAppointmentProps {
  appointment: AppointmentDetails | null
}

export function CalendarAppointment({ appointment }: CalendarAppointmentProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 px-6 py-4">
        <CardTitle className="text-lg font-semibold">Period Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Weeks</p>
          <h2 className="text-2xl font-bold">
           Period: "{appointment?.academic_period || ""}"

             {appointment?.academic_period_weeks && (
              <span className="text-sm font-medium text-muted-foreground">
                {" "}
               
              {appointment.academic_period_weeks.map((week, index) => (
                <p key={index} className="ml-2">
                  {week.number} - {week.startDate} to {week.endDate} - {week.dayCount} days
                </p>
              ))}
              </span>
            )} 
          </h2>
        </div>
     
    
      </CardContent>
    </Card>
  )
}