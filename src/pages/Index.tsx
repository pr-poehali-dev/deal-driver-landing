import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowStickyButton(scrollPosition > 500);
      
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          element.classList.add('is-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded) {
            setVideoLoaded(true);
          }
        });
      },
      { rootMargin: '100px' }
    );

    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      observer.observe(videoSection);
    }

    return () => observer.disconnect();
  }, [videoLoaded]);

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 3 часов.",
    });
    setIsOpen(false);
    setFormData({ name: '', company: '', position: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-bank-dark via-bank-blue to-bank-dark text-white py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Единый стандарт переговоров для кредитных менеджеров по крупным сделкам
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 text-gray-200 font-medium">
              Как удерживать условия и быстро проходить внутренний контур согласований
            </p>
            <p className="text-base sm:text-lg mb-6 md:mb-8 text-gray-300">
              2 дня практики | 80% времени — реальные кейсы вашего банка | Для команд 12–15 человек
            </p>
            
            <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto bg-success-green hover:bg-green-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              ОСТАВИТЬ ЗАЯВКУ
            </Button>
            
            <p className="text-sm mt-4 text-gray-300 italic">
              *Мы свяжемся с вами в течение 3 часов и уточним задачу департамента.
            </p>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Icon name="CheckCircle2" className="text-success-green" size={24} />
              <span className="text-sm font-medium">Опыт проектов в банках федерального уровня</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Icon name="CheckCircle2" className="text-success-green" size={24} />
              <span className="text-sm font-medium">500+ обученных менеджеров</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Icon name="CheckCircle2" className="text-success-green" size={24} />
              <span className="text-sm font-medium">20+ лет в сложных B2B‑переговорах</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            3 ситуации, которые «съедают» маржу, сроки и управляемость сделки
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-2 border-red-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-red-500 flex-shrink-0" size={32} />
                  <div>
                    <CardTitle className="text-lg sm:text-xl mb-2">Уступки в момент подписания</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 font-medium text-gray-700">Клиент: «Дайте скидку 0,5% — и подпишем».</p>
                <p className="text-red-600 font-semibold">Итог: потеря маржи + закрепляется привычка «дожимать».</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-red-500 flex-shrink-0" size={32} />
                  <div>
                    <CardTitle className="text-lg sm:text-xl mb-2">Смягчение ковенантов под давлением</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 font-medium text-gray-700">Клиент: «Уберите отчётность/ковенанты».</p>
                <p className="text-red-600 font-semibold">Итог: банк теряет рычаги контроля рисков.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-red-500 flex-shrink-0" size={32} />
                  <div>
                    <CardTitle className="text-lg sm:text-xl mb-2">Сделка вязнет во внутреннем контуре</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 font-medium text-gray-700">КК, СБ, юристы возвращают на доработки.</p>
                <p className="text-red-600 font-semibold">Итог: сроки растут, клиент уходит к более быстрому и гибкому конкуренту.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-bank-dark">
            Николай Лукша о тренинге «ДРАЙВЕР СДЕЛКИ»
          </h2>
          
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Icon name="PlayCircle" size={60} className="sm:w-20 sm:h-20 mx-auto mb-4 opacity-80" />
                <p className="text-lg sm:text-xl px-4">Видео 60–90 секунд</p>
              </div>
            </div>
          </div>
          
          <p className="text-center mt-6 text-gray-600 italic">
            80% времени — отработка на ваших кейсах, а не лекции.
          </p>
          
          <div className="text-center mt-8">
            <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto bg-bank-blue hover:bg-blue-700 text-white font-bold">
              ОСТАВИТЬ ЗАЯВКУ
            </Button>
          </div>
        </div>
      </section>

      {/* Artifacts Section */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-bank-dark">
            Что получит команда: рабочие инструменты
          </h2>
          <p className="text-center text-gray-600 mb-12">(фрагменты)</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Table" className="text-bank-blue" />
                  Матрица уступок
                </CardTitle>
                <CardDescription>Что для банка дорого / дёшево</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-lg border border-gray-200 h-48 flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-gray-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" className="text-bank-blue" />
                  Алгоритм ответа на кранч
                </CardTitle>
                <CardDescription>5 шагов удержания позиции</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-lg border border-gray-200 h-48 flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-gray-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileCheck" className="text-bank-blue" />
                  Шаблон упаковки сделки для КК
                </CardTitle>
                <CardDescription>Структура аргументации</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-lg border border-gray-200 h-48 flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-gray-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" className="text-bank-blue" />
                  Шпаргалка по ковенантам
                </CardTitle>
                <CardDescription>Логика ценности для клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-lg border border-gray-200 h-48 flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center mt-8 text-gray-600 italic">
            Это реальные материалы программы. Оформление и формулировки адаптируются под ваш банк.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            5 навыков, которые начинают применять сразу после тренинга
          </h2>
          
          <div className="space-y-6">
            {[
              {
                number: "01",
                title: "Кранчи (скидка «в конце»)",
                description: "Что отвечать, чтобы удерживать позицию без конфликта."
              },
              {
                number: "02",
                title: "Защита ковенантов",
                description: "Как объяснять ценность контроля и переводить давление в обмен."
              },
              {
                number: "03",
                title: "Модель обмена уступками",
                description: "«Если вы… то мы…» + матрица уступок."
              },
              {
                number: "04",
                title: "Манипуляции/давление",
                description: "Спокойные ответы без оправданий и агрессии."
              },
              {
                number: "05",
                title: "Обоснование цены и условий",
                description: "Перенос фокуса с «дорого» на «выгодно/безопасно»."
              }
            ].map((skill) => (
              <Card key={skill.number} className="border-l-4 border-l-success-green hover:shadow-lg transition-shadow">
                <CardContent className="flex gap-6 items-start p-6">
                  <div className="text-5xl font-bold text-success-green/20 flex-shrink-0">
                    {skill.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-bank-dark">{skill.title}</h3>
                    <p className="text-gray-700">{skill.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Feature Section - Internal Approvals */}
      <section className="py-20 bg-gradient-to-br from-bank-blue to-bank-dark text-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-success-green text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              КЛЮЧЕВАЯ ОСОБЕННОСТЬ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Встроенный модуль: внутренние согласования (КК, СБ, юристы)
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-6 md:mb-8">
              Большинство программ концентрируются только на клиенте. 
              Здесь отрабатывается управление сделкой и <strong>внутри банка</strong>: 
              как ускорять прохождение сделки и уменьшать ручные эскалации.
            </p>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Что отрабатываем на кейсах участников:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start">
                <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">Как «упаковать» сделку под логику КК.</p>
              </div>
              <div className="flex gap-4 items-start">
                <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">Как отвечать на типовые возражения СБ/юристов без конфликта.</p>
              </div>
              <div className="flex gap-4 items-start">
                <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">Как снижать нагрузку на руководителя как «единственную точку решения».</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Training Process */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            Как проходит тренинг
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-t-4 border-t-bank-blue">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Calendar" className="text-bank-blue" size={32} />
                  <CardTitle className="text-2xl">До тренинга</CardTitle>
                </div>
                <CardDescription className="text-base">1–2 недели</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Интервью с руководителем</li>
                  <li>• Сбор кейсов участников</li>
                  <li>• Адаптация упражнений</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-success-green">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Users" className="text-success-green" size={32} />
                  <CardTitle className="text-2xl">2 дня очно</CardTitle>
                </div>
                <CardDescription className="text-base">16 часов практики</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-800">День 1:</p>
                    <p className="text-gray-700">Кранчи, ковенанты, обмен уступками</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">День 2:</p>
                    <p className="text-gray-700">Давление/манипуляции + внутренний контур + финальная симуляция</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-bank-blue">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="TrendingUp" className="text-bank-blue" size={32} />
                  <CardTitle className="text-2xl">После</CardTitle>
                </div>
                <CardDescription className="text-base">Поддержка</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• 2 недели поддержки</li>
                  <li>• Разбор сложных кейсов</li>
                  <li>• Повторная онлайн-сессия через месяц</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            Практические результаты после внедрения
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-success-green hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-start gap-3">
                  <Icon name="TrendingDown" className="text-success-green flex-shrink-0" size={32} />
                  <span>Меньше безусловных уступок</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  Частота безусловных уступок сокращается в <strong className="text-success-green text-2xl">1,5–2 раза</strong> в первые 2–3 месяца.
                </p>
                <p className="text-sm text-gray-600 italic">
                  *Оценка по анкетированию руководителей/участников через 6–12 недель и разбору типовых кейсов до/после.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success-green hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-start gap-3">
                  <Icon name="Shield" className="text-success-green flex-shrink-0" size={32} />
                  <span>Устойчивее защита ковенантов</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  Доля сделок с сохранёнными ключевыми ковенантами растёт на <strong className="text-success-green text-2xl">30–40%</strong>.
                </p>
                <p className="text-sm text-gray-600 italic">
                  *Оценка по анкетированию руководителей/участников через 6–12 недель и разбору типовых кейсов до/после.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success-green hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-start gap-3">
                  <Icon name="Zap" className="text-success-green flex-shrink-0" size={32} />
                  <span>Быстрее внутренние согласования</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  Время внутренних согласований сокращается на <strong className="text-success-green text-2xl">20–35%</strong> за счёт правильной «упаковки» сделки.
                </p>
                <p className="text-sm text-gray-600 italic">
                  *Оценка по анкетированию руководителей/участников через 6–12 недель и разбору типовых кейсов до/после.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success-green hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-start gap-3">
                  <Icon name="Target" className="text-success-green flex-shrink-0" size={32} />
                  <span>Единый стандарт поведения</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  Команда меньше «плавает» в сложных переговорах и действует по согласованной логике.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 7: Cases and Reviews */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center text-bank-dark">
            Проекты в банковском секторе: типовые задачи и эффекты
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-l-4 border-l-bank-blue hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Icon name="DollarSign" className="text-bank-blue" size={32} />
                  Кейс 1 — Переговоры по марже
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Контекст:</p>
                  <p className="text-gray-700">Крупные сделки, финал переговоров.</p>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-1">Было:</p>
                  <p className="text-gray-700">Уступки под давлением «чтобы не потерять клиента».</p>
                </div>
                <div>
                  <p className="font-semibold text-bank-blue mb-1">Стало:</p>
                  <p className="text-gray-700">Алгоритм ответа + переход к обмену уступками.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-success-green">
                  <p className="font-semibold text-success-green mb-1">Эффект:</p>
                  <p className="text-gray-800">Частота безусловных уступок снизилась в 2 раза.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-bank-blue hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Icon name="Shield" className="text-bank-blue" size={32} />
                  Кейс 2 — Ковенанты/контроль
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Контекст:</p>
                  <p className="text-gray-700">Клиенты регулярно давят на смягчение контроля.</p>
                </div>
                <div>
                  <p className="font-semibold text-bank-blue mb-1">Стало:</p>
                  <p className="text-gray-700">Аргументация ценности условий + сценарии «мягкого отказа».</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-success-green">
                  <p className="font-semibold text-success-green mb-1">Эффект:</p>
                  <p className="text-gray-800">Ковенанты чаще сохраняются, меньше «размытых» условий.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-bank-blue hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Icon name="GitPullRequest" className="text-bank-blue" size={32} />
                  Кейс 3 — Внутренние согласования
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Контекст:</p>
                  <p className="text-gray-700">Повторные возвраты на доработку от КК/СБ/юристов.</p>
                </div>
                <div>
                  <p className="font-semibold text-bank-blue mb-1">Стало:</p>
                  <p className="text-gray-700">Шаблон «упаковки» + подготовка аргументации.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-success-green">
                  <p className="font-semibold text-success-green mb-1">Эффект:</p>
                  <p className="text-gray-800">Меньше возвратов, быстрее прохождение финальных стадий.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 8: About Trainer */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-bank-dark">
            О тренере
          </h2>
          
          <Card className="border-t-4 border-t-bank-blue">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-bank-blue to-bank-dark rounded-full flex items-center justify-center">
                    <Icon name="User" size={48} className="sm:w-16 sm:h-16 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4 text-bank-dark">Николай Лукша</h3>
                  <p className="text-lg sm:text-xl text-gray-700 mb-4 md:mb-6">Бизнес-тренер по переговорам для банковского сектора</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                      <p className="text-gray-700">20+ лет практики в сложных B2B-переговорах</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                      <p className="text-gray-700">Фокус: защита условий сделки под давлением + внутренний контур согласований</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t pt-4 md:pt-6">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <Icon name="Mail" className="text-bank-blue flex-shrink-0" size={20} />
                      <a href="mailto:loukcha@gmail.com" className="text-bank-blue hover:underline text-sm sm:text-base break-all">loukcha@gmail.com</a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <Icon name="Phone" className="text-bank-blue flex-shrink-0" size={20} />
                      <a href="tel:+79267318859" className="text-bank-blue hover:underline text-sm sm:text-base">+7 926 731 88 59</a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <Icon name="Globe" className="text-bank-blue flex-shrink-0" size={20} />
                      <a href="http://www.investrening.ru" target="_blank" rel="noopener noreferrer" className="text-bank-blue hover:underline text-sm sm:text-base break-all">www.investrening.ru</a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 9: Pricing */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            Стоимость и состав
          </h2>
          
          <Card className="border-2 border-bank-blue shadow-xl">
            <CardHeader className="bg-gradient-to-r from-bank-blue to-bank-dark text-white">
              <CardTitle className="text-3xl sm:text-4xl text-center">300 000 ₽</CardTitle>
              <CardDescription className="text-center text-gray-200 text-lg">за 1 группу (до 15 человек)</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-bank-dark">Включено:</h3>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                  <p className="text-base sm:text-lg text-gray-700">Предтренинговая диагностика и адаптация под банк</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                  <p className="text-base sm:text-lg text-gray-700">2 дня очной практики (16 часов)</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                  <p className="text-base sm:text-lg text-gray-700">Встроенный модуль по внутреннему контуру</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                  <p className="text-base sm:text-lg text-gray-700">Материалы/шпаргалки</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                  <p className="text-base sm:text-lg text-gray-700">Пост-поддержка 2 недели + повторная сессия через месяц</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 sm:p-6 rounded-lg border-l-4 border-success-green">
                <p className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Окупаемость (консервативно):</p>
                <p className="text-gray-700 text-sm sm:text-base">Если тренинг помогает удерживать условия/маржу хотя бы в 5–10% крупных сделок, эффект перекрывает стоимость в первый месяц после проведения.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 10: How to Start */}
      <section className="py-20 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            Как начать
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center border-t-4 border-t-success-green">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-success-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-bank-dark">Оставьте заявку</h3>
                <p className="text-gray-700">Заполните форму на сайте</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-bank-blue">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-bank-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-bank-dark">Диагностический созвон</h3>
                <p className="text-gray-700">30 минут: задачи, типовые ситуации, внутренний контур</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-success-green">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-success-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-bank-dark">Согласование</h3>
                <p className="text-gray-700">Формат и даты: сбор кейсов → проведение → сопровождение</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-20 bg-white animate-on-scroll">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-bank-dark">
            Частые вопросы
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <Icon name="HelpCircle" className="text-bank-blue flex-shrink-0" size={24} />
                  Можно ли провести тренинг онлайн?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Можно, но предпочтителен очный формат из-за ролевых игр и практических упражнений, которые требуют прямого взаимодействия.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <Icon name="HelpCircle" className="text-bank-blue flex-shrink-0" size={24} />
                  Сколько должно быть участников?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Оптимум 12–15 человек, минимум 8, максимум 18. Если участников больше — рекомендуется разделить на 2 потока.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <Icon name="HelpCircle" className="text-bank-blue flex-shrink-0" size={24} />
                  Не станут ли менеджеры агрессивными после тренинга?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Нет: фокус тренинга на партнёрской позиции «на равных» без конфликта. Цель — защищать условия профессионально, а не агрессивно.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 12: Final CTA */}
      <section className="py-20 bg-gradient-to-br from-bank-dark to-bank-blue text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center">
            Обсудите задачи вашего департамента с тренером
          </h2>
          <p className="text-lg sm:text-xl mb-6 md:mb-8 text-gray-200 text-center">
            На коротком звонке:
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                <p className="text-lg">Определим 2–3 типовые ситуации, где команда теряет позицию.</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                <p className="text-lg">Скажем, на что делать упор (клиент/ковенанты/внутренний контур).</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="text-success-green flex-shrink-0 mt-1" size={20} />
                <p className="text-lg">Предложим структуру программы под ваши цели.</p>
              </div>
            </div>
          </div>

          <Card className="max-w-md mx-auto" id="contact-form">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="final-name" className="text-gray-700">Имя*</Label>
                  <Input id="final-name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white" />
                </div>
                <div>
                  <Label htmlFor="final-email" className="text-gray-700">Рабочий Email*</Label>
                  <Input id="final-email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white" />
                </div>
                <div>
                  <Label htmlFor="final-phone" className="text-gray-700">Телефон*</Label>
                  <Input id="final-phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white" />
                </div>
                <Button type="submit" className="w-full bg-success-green hover:bg-green-600 text-white font-bold py-4 sm:py-6">
                  ОСТАВИТЬ ЗАЯВКУ
                </Button>
                <p className="text-xs sm:text-sm text-center text-gray-600 italic">*Мы свяжемся с вами в течение 3 часов.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Old Final CTA - Keep for additional conversion point */}
      <section className="py-20 bg-gradient-to-br from-bank-dark to-bank-blue text-white" style={{display: 'none'}}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Готовы внедрить единый стандарт переговоров?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Оставьте заявку — мы свяжемся с вами в течение 3 часов и обсудим задачи вашего департамента.
          </p>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-success-green hover:bg-green-600 text-white font-bold text-xl px-12 py-8 rounded-lg shadow-2xl hover:shadow-3xl transition-all">
                ОСТАВИТЬ ЗАЯВКУ
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bank-dark text-gray-400 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">КОРПОРАТИВНЫЙ ТРЕНИНГ «ДРАЙВЕР СДЕЛКИ»</h3>
            <p className="mb-4">Единый стандарт переговоров для кредитных менеджеров</p>
            
            <div className="border-t border-gray-600 pt-6 mt-6">
              <p className="text-sm mb-2">ИП Лукша Николай Леонидович</p>
              <p className="text-sm mb-4">ИНН: 500316027838</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                <span className="hidden sm:inline">|</span>
                <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
              </div>
              
              <p className="text-sm mt-6">© 2025 Все права защищены</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        showStickyButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}>
        <Button 
          size="lg" 
          onClick={scrollToForm} 
          className="bg-success-green hover:bg-green-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
        >
          <Icon name="MessageSquare" size={20} />
          <span className="hidden sm:inline">ОСТАВИТЬ ЗАЯВКУ</span>
          <span className="sm:hidden">Заявка</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;