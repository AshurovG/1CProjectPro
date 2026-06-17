interface GanttTask {
  id: number;
  name: string;
  assignee: string;
  start: Date;
  end: Date;
  progress: number;
  status: 'completed' | 'in-progress' | 'pending';
  dependencies: number[];
}

interface GanttChartProps {
  tasks: GanttTask[];
}

export function GanttChart({ tasks }: GanttChartProps) {
  // Вычисляем минимальную и максимальную даты
  const allDates = tasks.flatMap(task => [task.start, task.end]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  // Генерируем месяцы для заголовка
  const months: Date[] = [];
  const currentDate = new Date(minDate);
  currentDate.setDate(1); // Начало месяца
  
  while (currentDate <= maxDate) {
    months.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  // Вычисляем общее количество дней
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Функция для вычисления позиции и ширины полосы задачи
  const getTaskBarPosition = (task: GanttTask) => {
    const startOffset = Math.ceil((task.start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };
  
  // Формат даты для отображения
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' });
  };
  
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
  };
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Заголовок с месяцами */}
        <div className="flex border-b">
          <div className="w-[300px] flex-shrink-0 p-3 border-r bg-muted/30">
            <span className="text-sm">Задача</span>
          </div>
          <div className="flex-1 flex">
            {months.map((month, index) => {
              const monthStart = new Date(month);
              const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
              const isLastMonth = index === months.length - 1;
              
              let daysInRange;
              if (index === 0) {
                // Первый месяц
                daysInRange = Math.ceil((Math.min(monthEnd.getTime(), maxDate.getTime()) - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              } else if (isLastMonth) {
                // Последний месяц
                daysInRange = Math.ceil((maxDate.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              } else {
                // Полные месяцы
                daysInRange = monthEnd.getDate();
              }
              
              const widthPercent = (daysInRange / totalDays) * 100;
              
              return (
                <div
                  key={index}
                  className="border-r p-3 text-center bg-muted/30"
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="text-sm">{formatMonth(month)}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Задачи */}
        <div className="relative">
          {tasks.map((task) => {
            const position = getTaskBarPosition(task);
            
            return (
              <div key={task.id} className="flex border-b hover:bg-muted/30 transition-colors">
                {/* Информация о задаче */}
                <div className="w-[300px] flex-shrink-0 p-3 border-r">
                  <div className="space-y-1">
                    <p className="text-sm">{task.name}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.assignee}</span>
                      <span className={`px-2 py-0.5 rounded ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Временная шкала */}
                <div className="flex-1 relative p-3">
                  <div 
                    className="absolute h-8 rounded overflow-hidden"
                    style={{
                      left: position.left,
                      width: position.width,
                      top: '12px'
                    }}
                  >
                    {/* Фон полосы */}
                    <div className={`h-full ${
                      task.status === 'completed' ? 'bg-green-200' :
                      task.status === 'in-progress' ? 'bg-blue-200' :
                      'bg-gray-200'
                    }`}>
                      {/* Прогресс */}
                      <div 
                        className={`h-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    
                    {/* Даты на полосе */}
                    <div className="absolute inset-0 flex items-center justify-between px-2 text-xs pointer-events-none">
                      <span className="text-gray-700">{formatDate(task.start)}</span>
                      <span className="text-gray-700">{formatDate(task.end)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Легенда */}
        <div className="flex items-center gap-6 p-4 border-t bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-xs text-muted-foreground">Завершено</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-xs text-muted-foreground">В процессе</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-400" />
            <span className="text-xs text-muted-foreground">Запланировано</span>
          </div>
        </div>
      </div>
    </div>
  );
}