import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Plus, Clock, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'deadline' | 'milestone';
  attendees?: number;
  color: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "Спринт-планирование",
    date: new Date(2025, 10, 6),
    time: "14:00",
    type: "meeting",
    attendees: 8,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Deadline: API интеграция",
    date: new Date(2025, 10, 8),
    time: "18:00",
    type: "deadline",
    color: "bg-red-500",
  },
  {
    id: "3",
    title: "Релиз v2.0",
    date: new Date(2025, 10, 10),
    time: "10:00",
    type: "milestone",
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "Ретроспектива спринта",
    date: new Date(2025, 10, 12),
    time: "15:00",
    type: "meeting",
    attendees: 8,
    color: "bg-blue-500",
  },
  {
    id: "5",
    title: "Дизайн-ревью",
    date: new Date(2025, 10, 7),
    time: "11:00",
    type: "meeting",
    attendees: 5,
    color: "bg-blue-500",
  },
];

const upcomingEvents = [
  {
    title: "Спринт-планирование",
    date: "6 ноября, 14:00",
    attendees: 8,
    type: "meeting",
  },
  {
    title: "Дизайн-ревью",
    date: "7 ноября, 11:00",
    attendees: 5,
    type: "meeting",
  },
  {
    title: "Deadline: API интеграция",
    date: "8 ноября, 18:00",
    type: "deadline",
  },
  {
    title: "Релиз v2.0",
    date: "10 ноября, 10:00",
    type: "milestone",
  },
];

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 4)); // November 4, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 4));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Convert to Monday = 0

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border-r border-b bg-muted/30" />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month;
      const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
      
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-20 border-r border-b p-2 cursor-pointer transition-colors hover:bg-muted/50 ${
            isSelected ? 'bg-primary/10' : ''
          }`}
        >
          <div className={`text-sm mb-1 ${isToday ? 'inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground' : ''}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded truncate ${event.color} text-white`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} еще</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Календарь</h1>
            <p className="text-muted-foreground">
              Планирование задач, встреч и дедлайнов
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить событие
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{monthNames[month]} {year}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 border-l border-t">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="border-r border-b bg-muted p-2 text-center text-sm">
                      {day}
                    </div>
                  ))}
                  {renderCalendarDays()}
                </div>
                
                <div className="mt-6">
                  <h3 className="mb-4">
                    События на {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </h3>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => (
                        <Card key={event.id}>
                          <CardContent className="flex items-center gap-4 p-4">
                            <div className={`h-10 w-1 rounded ${event.color}`} />
                            <div className="flex-1">
                              <h4 className="mb-1 text-sm">{event.title}</h4>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.time}</span>
                                </div>
                                {event.attendees && (
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{event.attendees} участников</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Badge variant="outline">
                              {event.type === 'meeting' ? 'Встреча' : 
                               event.type === 'deadline' ? 'Дедлайн' : 'Веха'}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Нет событий на этот день
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ближайшие события</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`mt-1 h-2 w-2 rounded-full ${
                        event.type === 'meeting' ? 'bg-blue-500' :
                        event.type === 'deadline' ? 'bg-red-500' : 'bg-purple-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{event.title}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        {event.attendees && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees} участников</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Встречи в этом месяце</span>
                    <span>12</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-3/4 bg-blue-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Дедлайны</span>
                    <span>5</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/2 bg-red-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Вехи проекта</span>
                    <span>3</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/3 bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
