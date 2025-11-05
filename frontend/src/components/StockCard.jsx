export default function StockCard({ stock }) {
  const isAlert = stock.alertSent;
  return (
    <div className={`p-5 rounded-lg shadow-lg ${isAlert ? 'bg-red-600' : 'bg-gray-800'}`}>
      <h2 className="text-xl font-semibold">{stock.symbol}</h2>
      <p>Threshold: ₹{stock.threshold}</p>
      <p>Alert Sent: {isAlert ? '✅ Yes' : '❌ No'}</p>
    </div>
  );
}
