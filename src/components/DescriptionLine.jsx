export const DescriptionLine = ({ label, value, condition = true }) => (
  <>
    {condition && (
      <div>
        <label className="label">{label}: </label>
        <span className="value">{value}</span>
      </div>
    )}
  </>
)
