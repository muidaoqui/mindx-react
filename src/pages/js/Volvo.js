import logo from '../../img/volvo/logo.jpg'

function Volvo() {
  return (
    <div className="font-sans">
        <div className="flex justify-center my-10">
          <img src={logo} alt="Logo Volvo" className=" w-32"/>
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
          <div className="grid grid-cols-3 gap-4 mx-20">
            <div className="border-1 text-center text-lg text-black border-black ">
              <img src="{cclass}" alt=""/>
              <h2 className="text-black">Mercedes-Benz C-Class</h2>
              <h3 className="text-black">Giá từ 1,2 tỷ</h3>
            </div>                        
            <div className="border-1 text-center text-lg text-black border-black ">
              <img src="{cclass}" alt=""/>
              <h2 className="text-black">Mercedes-Benz C-Class</h2>
              <h3 className="text-black">Giá từ 1,2 tỷ</h3>
            </div> 
            <div className="border-1 text-center text-lg text-black border-black ">
              <img src="{cclass}" alt=""/>
              <h2 className="text-black">Mercedes-Benz C-Class</h2>
              <h3 className="text-black">Giá từ 1,2 tỷ</h3>
            </div> 
          </div>
        </div>
    </div>
  )
}

export default Volvo;