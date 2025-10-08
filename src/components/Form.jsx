import { useForm } from 'react-hook-form';

const Form = ({ title, fields, buttonText, onSubmit, onChange }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className="form-title">{title}</h1>
      {fields.map((field, index) => (
        <div key={index} className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          {field.fieldType === 'input' && (
            <input
              {...register(field.name, {
                required: field.required ? `${field.label} es requerido` : false,
                minLength: field.minLength ? {
                  value: field.minLength,
                  message: `Mínimo ${field.minLength} caracteres`
                } : undefined,
                maxLength: field.maxLength ? {
                  value: field.maxLength,
                  message: `Máximo ${field.maxLength} caracteres`
                } : undefined,
                validate: field.validate
              })}
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          )}
          {errors[field.name] && (
            <span className="error-message">{errors[field.name].message}</span>
          )}
          {field.errorMessageData && (
            <span className="error-message">{field.errorMessageData}</span>
          )}
        </div>
      ))}
      <button type="submit" className="submit-button">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
