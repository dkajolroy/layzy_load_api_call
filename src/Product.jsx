import React from 'react'

export default function Product({ product }) {

    return (
        <div style={{
            width: "20%"
        }}>
            <div style={{
                backgroundColor: "tomato",
                margin: "10px"
            }}>
                <img style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover"
                }} src={product.thumbnail} alt={product.title} />
                <h4 style={{ margin: 0 }}>No:{product.id}--{product.title}</h4>
                <h5 style={{ margin: 0 }}>Price: ${product.price}</h5>
            </div>
        </div>
    )
}
