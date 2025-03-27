import logo from '../../img/volvo/logo.jpg'
import {xc40, xc60, xc90, ec40, s90} from '../../img/volvo/index.js';
function Volvo() {
  return (
    <div className="font-sans mb-10">
        <div className="flex justify-center my-16">
          <img src={logo} alt="Logo Volvo" className=" w-20"/>
        </div>
        <div className="flex justify-between mx-20">
            <div>
              <p className="font-light">request a quote</p>
              <h1 className="text-3xl font-bold">Select model</h1>
            </div>
            <div>
              <h3 className="text-xl font-light text-black">Select which car to get a quote on</h3>
            </div>
        </div>
        <div className="flex justify-center my-10 gap-1 w-auto">
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10 ">
            All
          </button>
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10"> 
            Electric
          </button>
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10">
            Plug-In Hybrid
          </button>
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10">
            Mild Hybrid
          </button>
        </div>
        <div>
          <h1 className="text-xl font-bold mx-20 my-10">SUV</h1>
          <div className="grid grid-cols-3 gap-4 mx-20 ">
            
            <div className="border-1 text-lg text-black border-black ">
              <img src={xc40} alt="" className="mb-10 bg-red-100 h-auto w-full"/>
              <h2 className="text-black">XC40</h2>
              <h3 className="text-black">Mild hybrid</h3>
            </div>                        
            <div className="border-1 text-lg text-black border-black ">
              <img src={xc60} alt="" className="mb-10 bg-red-100 h-auto w-full"/>
              <h2 className="text-black">XC60</h2>
              <h3 className="text-black">Mild hybrid</h3>
            </div> 
            <div className="border-1 text-lg text-black border-black ">
              <img src={xc90} alt="" className="mb-10 bg-red-100 h-auto w-full"/>
              <h2 className="text-black">XC90</h2>
              <h3 className="text-black">Mild hybrid</h3>
            </div> 
          </div>
          <h1 className="text-xl font-bold mx-20 my-10">Crossover</h1>
          <div className="grid grid-cols-3 gap-4 mx-20 ">
            
            <div className="border-1 text-lg text-black border-black ">
              <img src={ec40} alt="" className="mb-10 bg-red-100 h-auto w-full"/>
              <h2 className="text-black">EC40</h2>
              <h3 className="text-black">Electric</h3>
            </div>                        
          </div>
          <h1 className="text-xl font-bold mx-20 my-10">Sedans</h1>
          <div className="grid grid-cols-3 gap-4 mx-20 ">
            
            <div className="border-1 text-lg text-black border-black ">
              <img src={s90} alt="" className="mb-10 bg-red-100 h-auto w-full"/>
              <h2 className="text-black">S90</h2>
              <h3 className="text-black">Mild hybrid</h3>
            </div>                        
          </div>
        </div>
    </div>
  )
}

export default Volvo;