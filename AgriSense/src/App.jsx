import { DiagnosisProvider } from './context/DiagnosisContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import DiagnosisSystem from './features/Diagnosis/DiagnosisSystem';

/**
 * App — Root component.
 * Wraps the entire application in DiagnosisProvider so all
 * children share the same diagnosis session state.
 */
export default function App() {
  return (
    <DiagnosisProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        {/* Flex-1 section fills remaining height; flex+center aligns content both axes */}
        <div className="flex flex-1 items-center justify-center w-full py-6 sm:py-10 px-4">
          <div className="w-full max-w-4xl">
            <DiagnosisSystem />
          </div>
        </div>
        <Footer />
      </div>
    </DiagnosisProvider>
  );
}
