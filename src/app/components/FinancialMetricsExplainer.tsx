import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  PieChart,
  BarChart3,
  Info,
} from "lucide-react";

/**
 * Компонент для объяснения финансовых метрик и расчетов
 * Используется в справке и подсказках для пользователей
 */
export function FinancialMetricsExplainer() {
  const metrics = [
    {
      name: "ROI (Return on Investment)",
      icon: TrendingUp,
      description: "Коэффициент окупаемости инвестиций",
      formula: "ROI = ((Выручка - Затраты) / Затраты) × 100%",
      example: "При затратах 5 млн ₽ и выручке 9.2 млн ₽: ROI = ((9.2 - 5) / 5) × 100% = 84%",
      interpretation: "Показывает, сколько прибыли приносит каждый вложенный рубль. ROI > 50% считается отличным результатом.",
      color: "text-green-600",
    },
    {
      name: "NPV (Net Present Value)",
      icon: DollarSign,
      description: "Чистая приведенная стоимость",
      formula: "NPV = Σ (Денежный поток / (1 + Ставка дисконтирования)^период)",
      example: "NPV = 3.2 млн ₽ означает, что проект создаст 3.2 млн ₽ чистой стоимости с учетом временной стоимости денег",
      interpretation: "Положительный NPV означает, что проект прибылен. Чем выше NPV, тем лучше.",
      color: "text-blue-600",
    },
    {
      name: "IRR (Internal Rate of Return)",
      icon: Calculator,
      description: "Внутренняя норма доходности",
      formula: "IRR - ставка, при которой NPV = 0",
      example: "IRR = 28.5% означает, что проект генерирует доходность 28.5% годовых",
      interpretation: "Сравните IRR с вашей минимальной требуемой доходностью. IRR > требуемая доходность = хороший проект.",
      color: "text-purple-600",
    },
    {
      name: "Период окупаемости (Payback Period)",
      icon: Clock,
      description: "Время возврата инвестиций",
      formula: "Период = Общие инвестиции / Среднемесячный денежный поток",
      example: "При бюджете 5 млн ₽ и среднем доходе 280 тыс/мес: Период = 5,000,000 / 280,000 ≈ 18 месяцев",
      interpretation: "Показывает, через сколько месяцев проект вернет вложенные средства. Чем короче, тем лучше.",
      color: "text-orange-600",
    },
    {
      name: "Точка безубыточности (Break-Even Point)",
      icon: BarChart3,
      description: "Момент, когда доходы равны расходам",
      formula: "Break-Even = Постоянные затраты / (Цена - Переменные затраты)",
      example: "Точка безубыточности в марте 2026 означает, что с этого момента проект начнет приносить прибыль",
      interpretation: "Важная веха проекта - момент, когда накопленная выручка сравнялась с затратами.",
      color: "text-red-600",
    },
    {
      name: "Budget Variance (Отклонение бюджета)",
      icon: PieChart,
      description: "Разница между планом и фактом",
      formula: "Variance = Фактические затраты - Плановый бюджет",
      example: "Variance = -200,000 ₽ означает перерасход на 200 тыс ₽",
      interpretation: "Отрицательное значение = перерасход, положительное = экономия. Контролируйте отклонения.",
      color: "text-yellow-600",
    },
  ];

  const trackingMethods = [
    {
      name: "По фазам проекта",
      description: "Затраты группируются по этапам: планирование, разработка, тестирование, внедрение",
      bestFor: "Waterfall проекты с четкими фазами",
    },
    {
      name: "По категориям расходов",
      description: "Затраты делятся на: персонал, инфраструктура, маркетинг, прочее",
      bestFor: "Все типы проектов, универсальный подход",
    },
    {
      name: "По ресурсам",
      description: "Затраты отслеживаются по конкретным ресурсам: сотрудники, оборудование, лицензии",
      bestFor: "Проекты с критичными ресурсами",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Финансовые метрики - Справочник
          </CardTitle>
          <CardDescription>
            Понимание ключевых финансовых показателей для эффективного управления проектом
          </CardDescription>
        </CardHeader>
      </Card>

      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-neutral-100`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div className="flex-1">
                <CardTitle>{metric.name}</CardTitle>
                <CardDescription>{metric.description}</CardDescription>
              </div>
              <Badge variant="outline">{metric.name.split(' ')[0]}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-neutral-600 mb-1">Формула расчета:</p>
              <code className="block p-3 bg-neutral-50 rounded text-sm text-neutral-900">
                {metric.formula}
              </code>
            </div>
            <div>
              <p className="text-neutral-600 mb-1">Пример:</p>
              <p className="text-neutral-900 p-3 bg-blue-50 rounded text-sm">
                {metric.example}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 mb-1">Как интерпретировать:</p>
              <p className="text-neutral-900">{metric.interpretation}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Методы учета затрат</CardTitle>
          <CardDescription>Выберите подходящий способ отслеживания расходов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trackingMethods.map((method) => (
            <div key={method.name} className="p-4 border rounded-lg">
              <h4 className="text-neutral-900 mb-2">{method.name}</h4>
              <p className="text-neutral-600 mb-2">{method.description}</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Лучше для: {method.bestFor}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="text-neutral-900 mb-2 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Интеграция с 1С:Бухгалтерия
          </h4>
          <p className="text-neutral-600 mb-3">
            Все финансовые данные автоматически синхронизируются с 1С:Бухгалтерия. Это обеспечивает:
          </p>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
            <li>Актуальные данные о фактических затратах в реальном времени</li>
            <li>Автоматическое отражение проводок и документов</li>
            <li>Соответствие бухгалтерскому и управленческому учету</li>
            <li>Исключение ручного ввода и ошибок</li>
            <li>Единый источник правды для всех финансовых данных</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <h4 className="text-neutral-900 mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Сценарный анализ
          </h4>
          <p className="text-neutral-600 mb-3">
            Система автоматически рассчитывает три сценария развития проекта:
          </p>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="p-3 bg-white rounded border border-purple-200">
              <p className="text-green-600 mb-1">Оптимистичный</p>
              <p className="text-neutral-600 text-sm">Лучший возможный исход при благоприятных условиях</p>
            </div>
            <div className="p-3 bg-white rounded border border-purple-200">
              <p className="text-blue-600 mb-1">Реалистичный</p>
              <p className="text-neutral-600 text-sm">Наиболее вероятный сценарий на основе текущих данных</p>
            </div>
            <div className="p-3 bg-white rounded border border-purple-200">
              <p className="text-orange-600 mb-1">Пессимистичный</p>
              <p className="text-neutral-600 text-sm">Худший сценарий для оценки рисков</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
