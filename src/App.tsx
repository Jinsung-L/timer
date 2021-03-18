import Timer from './components/Timer'

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen py-20 antialiased text-white min-w-screen bg-blueGray-700">
      <Timer time={20} />
      <Timer time={5} />
    </div>
  )
}

export default App
