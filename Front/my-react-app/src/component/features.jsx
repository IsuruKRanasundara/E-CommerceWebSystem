const Features = ({selectedProduct}) => {
    return (
        <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2">
          {selectedProduct.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

    )
}
export default Features;