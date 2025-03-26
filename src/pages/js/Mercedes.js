import logo from '../../img/mec/logo.jpg'
import {cclass, eclass, sclass, glc, gle, gls, maysclass, maygls, g63} from '../../img/mec/index'

function Mercedes() {
  return (
    <div className="font-serif">
        <div className="my-10 flex flex-col items-center">
            <img src={logo} alt="Logo Mercedes" className="w-32"/>
            <h1 className="text-4xl my-6">Các dòng xe Mercedes-Benz</h1>
            <h4 className="text-xl">Khám phá thế giới đa dạng về thương hiệu và mẫu xe của chúng tôi: Tại đây, bạn sẽ tìm thấy chiếc xe mơ ước của mình.</h4>
        </div>
        <div className="flex justify-center w-1/2 mx-auto">
            <button className="border-2 border-black p-4 hover:bg-black hover:text-white">
                Mercrdes-Benz
            </button>
            <button className="border-2 border-black p-4 hover:bg-black hover:text-white">
                AMG
            </button>
            <button className="border-2 border-black p-4 hover:bg-black hover:text-white">
                MAYBACH
            </button>
        </div>
        <div className="flex my-16 mx-20">
            <div className="flex flex-col items-start gap-4 w-1/6">
                <h2 className="text-2xl text-black">13 Mẫu</h2>
                <h3 className="text-xl text-black">Loại thân xe</h3>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Sedans
                </button>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Xe địa hình / SUV
                </button>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Xe Coupé
                </button>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Cabriolet
                </button>
                <h3 className="text-xl text-black">Loại nhiên liệu</h3>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Điện
                </button>
            </div>
            <div className="w-full">
                <div class="flex-grow border-t border-gray-400"></div>
                <h1 className="text-center text-xl my-4">All</h1>
                <div class="flex-grow border-t border-gray-400 mb-4"></div>
                <div className="grid grid-cols-2 w-full justify-items-center gap-4">
                    <div className="border-1 text-center text-lg text-black border-black ">
                        <img src={cclass} alt=""/>
                        <h2 className="text-black">Mercedes-Benz C-Class</h2>
                        <h3 className="text-black">Giá từ 1,2 tỷ</h3>
                    </div>
                    <div className="border-1 text-center text-lg text-black border-black ">
                        <img src={eclass} alt=""/>
                        <h2 className="text-black">Mercedes-Benz E-Class</h2>
                        <h3 className="text-black">Giá từ 1,5 tỷ</h3>
                    </div>
                    <div className="border-1 text-center text-lg text-black border-black ">
                        <img src={sclass} alt=""/>
                        <h2 className="text-black">Mercedes-Benz S-Class</h2>
                        <h3 className="text-black">Giá từ 1,8 tỷ</h3>
                    </div>
                    <div className="border-1 text-center text-lg text-black text- border-black ">
                        <img src={glc} alt=""/>
                        <h2 className="text-black">Mercedes-Benz GLC</h2>
                        <h3 className="text-black">Giá từ 2,5 tỷ</h3>
                    </div>
                    <div className="border-1 text-center text-lg text-black text- border-black ">
                        <img src={gle} alt=""/>
                        <h2 className="text-black">Mercedes-Benz GLE</h2>
                        <h3 className="text-black">Giá từ 2,3 tỷ</h3>
                    </div>
                    <div className="border-1 text-center text-lg text-black text- border-black ">
                        <img src={gls} alt=""/>
                        <h2 className="text-black">Mercedes-Benz GLS</h2>
                        <h3 className="text-black">Giá từ 3,5 tỷ</h3>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mercedes;