function LocaleSelect({ value, onChange }) {
  const handelChange = (e) => onChange(e.target.value);

  return (
    <select value={value} onChange={handelChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;