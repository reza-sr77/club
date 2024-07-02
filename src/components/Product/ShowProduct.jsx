import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import EditProductImageModal from "./EditProductImageModal";
import EditProductModal from "./EditProductModal";
import TableRow from "./TableRow";

const ShowProduct = ({
    newData,
    filterDataHandler,
    againGetData
}) => {

    const childRef = useRef();
    const imageChildRef = useRef();

    const [productData, setProductData] = useState()

    const editProduct = (item) => {
        setProductData(item)
        childRef.current.showModal()
    }
    const editProductImage = (item) => {
        setProductData(item)
        imageChildRef.current.showModal()
    }

    return (
        <Fragment>
            <h2 class="intro-y text-lg font-medium mt-10">
                لیست محصولات
            </h2>

            <EditProductModal productData={productData} ref={childRef} reGetData={againGetData} />
            <EditProductImageModal productData={productData} ref={imageChildRef} reGetData={againGetData} />

            <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <Link to="/product-add">
                        <button class="btn btn-primary shadow-md ml-2">افزودن محصول جدید</button>
                    </Link>
                    <div class="hidden md:block mx-auto text-gray-600"></div>
                    <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div class="w-56 relative text-gray-700 dark:text-gray-300">
                            <input onChange={(e) => filterDataHandler({ name: e.target.value, page: 1 })} type="text" class="form-control w-56 box pl-10 placeholder-theme-8" placeholder="جستجو..." />
                            <i class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0" data-feather="search"></i>
                        </div>
                    </div>
                </div>
                {newData?.docs?.length ?
                    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table class="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th class="whitespace-nowrap">تصویر</th>
                                    <th class="whitespace-nowrap">نام محصول</th>
                                    <th class="whitespace-nowrap">توضیحات</th>
                                    <th class="text-center whitespace-nowrap">موجودی</th>
                                    <th class="text-center whitespace-nowrap">فعالیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Fragment>
                                    {newData?.docs.map((item) => (
                                        <TableRow
                                            key={item?._id}
                                            images={item?.images}
                                            name={item?.name}
                                            inventory={item?.inventory}
                                            description={item?.description}
                                            editProduct={() => editProduct(item)}
                                            editProductImage={() => editProductImage(item)}
                                        />
                                    ))}
                                </Fragment>
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <p className="w-full truncate text-gray-600 mt-0.5">
                            دیتایی برای نمایش وجود ندارد
                        </p>
                    </div>
                }

                {newData?.totalPages !== 1 ?
                    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                        <ul class="pagination">
                            {newData?.hasPrevPage ?
                                <Fragment>
                                    <li onClick={() => filterDataHandler({ page: newData?.prevPage })}>
                                        <p class="pagination__link"> <FaChevronRight class="w-4 h-4" data-feather="chevron-right" /> </p>
                                    </li>
                                    <li> <p class="pagination__link">...</p> </li>
                                    <li onClick={() => filterDataHandler({ page: newData?.prevPage })}> <p class="pagination__link">{newData?.prevPage}</p> </li>
                                </Fragment>
                                : null}

                            <li> <p class="pagination__link pagination__link--active">{newData?.page}</p> </li>
                            {newData?.hasNextPage ?
                                <Fragment>
                                    <li onClick={() => filterDataHandler({ page: newData?.nextPage })} > <p class="pagination__link">{newData?.nextPage}</p> </li>
                                    <li  > <p class="pagination__link">...</p> </li>
                                    <li onClick={() => filterDataHandler({ page: newData?.nextPage })} >
                                        <p class="pagination__link"> <FaChevronLeft class="w-4 h-4" data-feather="chevron-left" /> </p>
                                    </li>
                                </Fragment>
                                : null}
                        </ul>
                    </div>
                    : null}
            </div>

        </Fragment>
    )
}

export default ShowProduct