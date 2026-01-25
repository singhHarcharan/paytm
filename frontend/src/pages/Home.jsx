import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to PayPocket</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Your one-stop solution for seamless money transfers and payments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Sign In
          </button>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Fast Transfers', desc: 'Send money instantly to anyone, anywhere.' },
              { title: 'Secure', desc: 'Bank-level security for all your transactions.' },
              { title: 'Easy to Use', desc: 'Simple and intuitive interface.' }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
