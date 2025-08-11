const Description = ({selectedProduct}) => {
    return (
        <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
      </div>
    )
}
export default Description;