const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <>
      <span className="inline-block w-1/3 lg:hidden font-bold text-sm text-gray-900">
        {label}
      </span>
      <span className="text-sm text-primary-dark font-medium">{value}</span>
    </>
  )
}

export default Item
