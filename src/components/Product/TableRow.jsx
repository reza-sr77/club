import React from "react";

import { BaseApi } from './../../services/config'

const TableRow = ({ images, name, inventory, description, editProduct ,editProductImage}) => {
    return (
        <tr class="intro-x">
            <td class="w-40">
                <div class="flex">
                    <div onClick={editProductImage} class="w-10 h-10 image-fit zoom-in">
                        <img alt="product image" class="tooltip rounded-full" src={images && images[0] ? `${BaseApi}${images[0]["720"]}` : "dist/images/preview-8.jpg"} title="آپلود شده در3 آذر 1400" />
                    </div>
                </div>
            </td>
            <td>
                <p class="font-medium whitespace-nowrap">{name}</p>
            </td>
            <td>
                <p class="font-medium whitespace-nowrap">{description}</p>
            </td>
            <td class="text-center">{inventory}</td>
            <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                    <p onClick={editProduct} style={{cursor:"pointer"}} class="flex items-center ml-3"> <i data-feather="check-square" class="w-4 h-4 ml-1"></i> ویرایش</p>
                </div>
            </td>
        </tr>
    )
}
export default TableRow