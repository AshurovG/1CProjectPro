import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import { SimpleDropdown } from "./SimpleDropdown";
import { Plus, MoreVertical, Calendar, MessageSquare, Paperclip, Flag, Filter, Settings } from "lucide-react";

interface KanbanBoardProps {
  projectId: string | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignees: string[];
  dueDate: string;
  comments: number;
  attachments: number;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const marketingColumns: Column[] = [
  {
    id: "backlog",
    title: "Бэклог",
    tasks: [
      {
        id: "task-1",
        title: "Анализ целевой аудитории",
        description: "Исследование ЦА для осенней кампании",
        priority: "high",
        assignees: ["МК"],
        dueDate: "12 ноября",
        comments: 5,
        attachments: 3,
        tags: ["Исследование", "ЦА"],
      },
      {
        id: "task-2",
        title: "Подготовка email рассылки",
        description: "Создать шаблоны и контент",
        priority: "medium",
        assignees: ["ПВ"],
        dueDate: "15 ноября",
        comments: 2,
        attachments: 1,
        tags: ["Email", "Контент"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "В работе",
    tasks: [
      {
        id: "task-3",
        title: "Создание рекламных креативов",
        description: "Дизайн баннеров для соцсетей",
        priority: "high",
        assignees: ["МК", "ИС"],
        dueDate: "8 ноября",
        comments: 15,
        attachments: 8,
        tags: ["Дизайн", "SMM"],
      },
      {
        id: "task-4",
        title: "Настройка таргетированной рекламы",
        description: "Конфигурация кампаний в VK и Яндекс",
        priority: "high",
        assignees: ["ПВ"],
        dueDate: "10 ноября",
        comments: 7,
        attachments: 2,
        tags: ["Реклама", "Таргет"],
      },
    ],
  },
  {
    id: "review",
    title: "На проверке",
    tasks: [
      {
        id: "task-5",
        title: "Контент-план на ноябрь",
        description: "Расписание постов для всех платформ",
        priority: "medium",
        assignees: ["МК", "ИХ"],
        dueDate: "6 ноября",
        comments: 9,
        attachments: 4,
        tags: ["Контент", "SMM"],
      },
    ],
  },
  {
    id: "done",
    title: "Выполнено",
    tasks: [
      {
        id: "task-6",
        title: "Запуск конкурса в Instagram",
        description: "Организация и проведение конкурса",
        priority: "high",
        assignees: ["МК", "ИС"],
        dueDate: "1 ноября",
        comments: 18,
        attachments: 12,
        tags: ["Instagram", "Конкурс"],
      },
      {
        id: "task-7",
        title: "Анализ конкурентов Q3",
        description: "Отчет по маркетинговым активностям",
        priority: "medium",
        assignees: ["ИХ"],
        dueDate: "28 октября",
        comments: 8,
        attachments: 5,
        tags: ["Аналитика", "Конкуренты"],
      },
    ],
  },
];

function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const priorityLabels = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
  };

  return (
    <Card className="mb-3 cursor-pointer transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="flex-1 text-sm">{task.title}</h3>
          <SimpleDropdown
            trigger={
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            }
            items={[
              { label: "Редактировать", onClick: () => {} },
              { label: "Дублировать", onClick: () => {} },
              { label: "Удалить", onClick: () => {} },
            ]}
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mb-3 flex items-center gap-2">
          <Flag className={`h-3 w-3 ${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
          <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
        </div>

        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{task.dueDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees.map((assignee, index) => (
              <SimpleAvatar key={index} className="h-6 w-6 border-2 border-background">
                <SimpleAvatarFallback className="text-xs">{assignee}</SimpleAvatarFallback>
              </SimpleAvatar>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{task.comments}</span>
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(marketingColumns);

  const handleAddTask = (columnId: string) => {
    // Create new task
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Маркетинг Q4</h1>
            <p className="text-sm text-muted-foreground">Канбан доска для маркетинговых активностей</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Настройки проекта
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить задачу
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-8rem)] overflow-auto">
        <div className="flex gap-4 p-4" style={{ minWidth: 'max-content' }}>
          {columns.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">
                      {column.title}
                      <Badge variant="secondary" className="ml-2">
                        {column.tasks.length}
                      </Badge>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleAddTask(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {column.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}