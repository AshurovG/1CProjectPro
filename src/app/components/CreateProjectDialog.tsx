import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { X, Zap, BarChart3, Workflow } from "lucide-react";

interface CreateProjectDialogProps {
  onClose: () => void;
  onCreate: (project: NewProject) => void;
}

export interface NewProject {
  name: string;
  description: string;
  methodology: 'kanban' | 'scrum' | 'waterfall';
  startDate: string;
  endDate?: string;
}

const methodologies = [
  {
    id: 'kanban' as const,
    name: 'Kanban',
    icon: Workflow,
    description: 'Гибкая система управления потоком работ',
    features: ['Непрерывный поток', 'Визуализация работы', 'Ограничение WIP'],
    color: 'border-blue-500',
  },
  {
    id: 'scrum' as const,
    name: 'Scrum',
    icon: Zap,
    description: 'Итеративная разработка со спринтами',
    features: ['Фиксированные спринты', 'Daily stand-ups', 'Ретроспективы'],
    color: 'border-purple-500',
  },
  {
    id: 'waterfall' as const,
    name: 'Waterfall',
    icon: BarChart3,
    description: 'Последовательное выполнение этапов',
    features: ['Четкие фазы', 'Подробное планирование', 'Документация'],
    color: 'border-green-500',
  },
];

export function CreateProjectDialog({ onClose, onCreate }: CreateProjectDialogProps) {
  const [step, setStep] = useState<'methodology' | 'details'>('methodology');
  const [selectedMethodology, setSelectedMethodology] = useState<'kanban' | 'scrum' | 'waterfall'>('kanban');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  const handleCreate = () => {
    onCreate({
      ...formData,
      methodology: selectedMethodology,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-background shadow-lg">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="mb-1">Создать новый проект</h2>
            <p className="text-sm text-muted-foreground">
              {step === 'methodology' ? 'Выберите методологию управления' : 'Заполните детали проекта'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {step === 'methodology' ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {methodologies.map((method) => (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedMethodology === method.id
                        ? `border-2 ${method.color} bg-accent`
                        : 'border-2 border-transparent'
                    }`}
                    onClick={() => setSelectedMethodology(method.id)}
                  >
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <method.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-base">{method.name}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {method.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 text-sm">Выбрано: {methodologies.find(m => m.id === selectedMethodology)?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedMethodology === 'kanban' && 'Kanban идеально подходит для проектов с постоянным потоком задач и изменяющимися приоритетами.'}
                  {selectedMethodology === 'scrum' && 'Scrum отлично подходит для разработки продуктов с регулярными релизами и четкими спринтами.'}
                  {selectedMethodology === 'waterfall' && 'Waterfall подходит для проектов с четкими требованиями и последовательным выполнением этапов.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Название проекта</label>
                <Input
                  placeholder="Например: Разработка мобильного приложения"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Описание</label>
                <Textarea
                  placeholder="Краткое описание целей и задач проекта"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm">Дата начала</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                {selectedMethodology === 'waterfall' && (
                  <div className="space-y-2">
                    <label className="text-sm">Плановая дата завершения</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="mb-2 text-sm">Методология: {methodologies.find(m => m.id === selectedMethodology)?.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedMethodology === 'kanban' && 'Будет создана Kanban доска с колонками: Бэклог, В работе, На проверке, Выполнено'}
                  {selectedMethodology === 'scrum' && 'Будет создана Scrum доска с первым спринтом длительностью 2 недели'}
                  {selectedMethodology === 'waterfall' && 'Будет создан план проекта с классическими фазами: Анализ, Проектирование, Разработка, Тестирование, Внедрение'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between border-t p-6">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 'details') {
                setStep('methodology');
              } else {
                onClose();
              }
            }}
          >
            {step === 'details' ? 'Назад' : 'Отмена'}
          </Button>
          <Button
            onClick={() => {
              if (step === 'methodology') {
                setStep('details');
              } else {
                handleCreate();
              }
            }}
            disabled={step === 'details' && !formData.name}
          >
            {step === 'methodology' ? 'Далее' : 'Создать проект'}
          </Button>
        </div>
      </div>
    </div>
  );
}
