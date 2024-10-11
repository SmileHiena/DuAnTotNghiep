import Header from '../components/Header';
import './style.css';
export default function Home() {
  return (
    <div>
      <Header />
      <section className="hero">
        <div className="hero-text">
          <h1>Đặt vé xem phim tại TickerMan</h1>
          <p>Ưu đãi giảm giá 40% cho nhân viên...</p>
          <button>Đặt ngay</button>
        </div>
        <div className="hero-image">
          <img src="/promo.jpg" alt="Promo" />
        </div>
      </section>
    </div>
  );
}
