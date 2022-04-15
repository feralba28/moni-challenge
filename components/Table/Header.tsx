const Cell = ({ label }: { label: string }) => {
  return (
    <th className="bg-primary-dark/90 p-2 text-white text-sm font-bold lg:border lg:border-grey-500 text-left block lg:table-cell">
      {label}
    </th>
  )
}

const Header = ({ colums }: { colums: string[] }) => {
  return (
    <thead className="block lg:table-header-group">
      <tr className="border border-grey-500 lg:border-none block lg:table-row absolute -top-full lg:top-auto -left-full lg:left-auto  lg:relative ">
        {colums.map((element: string) => (
          <Cell key={element} label={element} />
        ))}
      </tr>
    </thead>
  )
}

export default Header
