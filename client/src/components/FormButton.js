function FormButton({ children }) {
  return (
    <div className="mb-3">
      <button type="submit" className="btn btn-primary btn-lg">
        {children}
      </button>
    </div>
  );
}

export default FormButton;
