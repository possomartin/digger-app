import DiggerB from "./diggerB";
import DiggerA from "./diggerA";

export default function App() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-5 p-10">
      <div className="flex">
        <DiggerA />
      </div>
      <div className="flex">
        <DiggerB />
      </div>
    </div>
  );
}
