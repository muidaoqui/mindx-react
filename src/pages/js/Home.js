import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; 
import poster from '../../img/poster.png';
import tt from '../../img/tantam.png'
import cl from '../../img/chienluoc.png'
import ava from '../../img/ava.jpg'
import {cclass, eclass} from '../../img/mec/index' 
import { innova, veloz } from '../../img/toyota/index';
function Home() {

  
  return (
    <div className="home">
      
      <main className="home-main">
        <div className='content'>
          <div className='poster'>
            <img src={poster} alt='Poster' className='h-auto  w-auto object-contain' />
          </div>
          <div className='hot'>
              <div className='my-16 mx-10 '>
                <img src = {tt} alt = "image" className = "float-right w-1/3 ml-40 mr-20"/>
                <h1 className="h1 text-2xl mb-8">Giới Thiệu</h1>
                <p>MD Autohunt là nền tảng chuyên cung cấp các dịch vụ và giải pháp săn tìm ô tô chất lượng, giúp khách hàng dễ dàng tìm được chiếc xe phù hợp với nhu cầu và ngân sách. Với sứ mệnh mang đến trải nghiệm mua bán xe an toàn, tiện lợi và minh bạch, MD Autohunt không chỉ cung cấp thông tin chi tiết về các mẫu xe mà còn hỗ trợ tư vấn, kiểm tra chất lượng và kết nối khách hàng với những đại lý, chủ xe uy tín.</p>
                <p>Chúng tôi cam kết mang đến cho khách hàng sự an tâm với các dịch vụ kiểm định xe chuyên sâu, thông tin giá cả minh bạch và các chương trình ưu đãi hấp dẫn. Dù bạn đang tìm kiếm một chiếc xe mới, xe đã qua sử dụng hay cần tư vấn về thị trường ô tô, MD Autohunt luôn sẵn sàng đồng hành cùng bạn. Hãy khám phá ngay MD Autohunt để trải nghiệm một cách tiếp cận mới, thông minh và hiệu quả hơn trong việc tìm kiếm chiếc xe mơ ước của bạn!</p>
              </div>
              <div className='my-20 mx-10 '>
                <img src = {cl} alt = "image" className = "float-left w-1/3 mx-20 mr-40"/>
                <h1 className="h1 text-2xl mb-8">Chiến Lược</h1>
                <p>MD Autohunt không chỉ là một nền tảng kết nối khách hàng với những mẫu xe chất lượng mà còn là một thương hiệu tiên phong trong ngành công nghiệp ô tô. Chiến lược của chúng tôi tập trung vào ba yếu tố cốt lõi: Công nghệ, Dịch vụ và Uy tín.</p>
                <p>Về công nghệ, chúng tôi liên tục nâng cấp hệ thống, sử dụng trí tuệ nhân tạo và dữ liệu lớn để tối ưu trải nghiệm tìm kiếm xe. Về dịch vụ, MD Autohunt cam kết mang lại sự minh bạch, hỗ trợ tận tình và quy trình giao dịch nhanh chóng. Uy tín của chúng tôi được xây dựng qua từng sản phẩm, từng khách hàng hài lòng và từng đánh giá tích cực.</p>
                <p>Với tầm nhìn dài hạn, MD Autohunt sẽ tiếp tục mở rộng mạng lưới, hợp tác với các đối tác hàng đầu trong ngành để mang đến trải nghiệm mua bán xe hiệu quả, an toàn và đáng tin cậy nhất.</p>
              </div>
          </div>
        </div>
        <div class="fixed right-0 bottom-40 bg-pink-100 p-4 rounded-lg shadow-md w-60">
        <div class="absolute  -left-1 bg-pink-100 p-1 rounded-lg shadow-md">
            <img src={ava} class="w-16 h-16 rounded-full border-1 border-gray-800 shadow-lg"/>
        </div>
        <div class="pl-20 pt-2">
            <h3 class="text-black font-semibold">Mui Dao</h3>
            <p class="text-gray-700 text-center text-sm">Service</p>
        </div>
    </div>
      </main>
    </div>
  );
}

export default Home;