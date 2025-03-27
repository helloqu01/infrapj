const services = [
    {
      title: "웹 개발",
      description: "모던 프론트엔드와 안정적인 백엔드로 완성도 높은 웹을 구축합니다.",
    },
    {
      title: "클라우드 구축",
      description: "AWS 기반 인프라 설계 및 비용 최적화를 도와드립니다.",
    },
    {
      title: "UX/UI 디자인",
      description: "사용자 중심의 직관적인 디자인으로 만족도를 높입니다.",
    },
  ];
  
  export default function Services() {
    return (
      <section id="services" className="py-20 px-4 bg-background">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">우리가 제공하는 서비스</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div key={i} className="p-6 border border-foreground/10 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-foreground/70">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  