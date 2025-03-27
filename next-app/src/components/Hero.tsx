export default function Hero() {
    return (
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-bold text-foreground mb-4">당신의 비즈니스를 위한 최고의 파트너</h2>
        <p className="max-w-xl text-foreground/80 mb-6">
          효율적인 기술과 창의적인 솔루션으로 함께 성장합니다.
        </p>
        <a href="#services" className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition">
          우리의 서비스 보기
        </a>
      </section>
    );
  }
  