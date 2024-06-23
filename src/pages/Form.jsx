import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter valid Email")
      .trim(),
    gender: z
      .string()
      .refine((value) => ["male", "female", "other"].includes(value), {
        message: "Please select a gender",
      }),
    hobbies: z
      .array(z.string())
      .nonempty({ message: "Select at least 2 hobbies" })
      .refine((value) => value.length >= 2, {
        message: "Select at least 2 hobbies",
      }),
    city: z
      .string()
      .refine(
        (value) =>
          value !== "" && cities.map((city) => city.value).includes(value),
        {
          message: "Please select a valid city",
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      hobbies: [],
      city: "",
    },
  });

  const cities = [
    { value: "", label: "Select a city" },
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Chicago", label: "Chicago" },
    { value: "Houston", label: "Houston" },
    { value: "Philadelphia", label: "Philadelphia" },
  ];

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" {...register("name")} />
        {!!errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="text" {...register("email")} />
        {!!errors.email && <p>{errors.email.message}</p>}
      </div>
      <label>Gender:</label>
      <input type="radio" id="male" value="male" {...register("gender")} />
      <label htmlFor="male">Male</label>
      <input type="radio" id="female" value="female" {...register("gender")} />
      <label htmlFor="female">Female</label>
      <input type="radio" id="other" value="other" {...register("gender")} />
      <label htmlFor="other">Other</label>
      {!!errors.gender && <p>{errors.gender.message}</p>}
      <div>
        <label>Hobbies (Select at least 2):</label>
        <input
          type="checkbox"
          id="hobby1"
          value="Reading"
          {...register("hobbies")}
        />
        <label htmlFor="hobby1">Reading</label>
        <input
          type="checkbox"
          id="hobby2"
          value="Gaming"
          {...register("hobbies")}
        />
        <label htmlFor="hobby2">Gaming</label>
        <input
          type="checkbox"
          id="hobby3"
          value="Cooking"
          {...register("hobbies")}
        />
        <label htmlFor="hobby3">Cooking</label>
        <input
          type="checkbox"
          id="hobby4"
          value="Traveling"
          {...register("hobbies")}
        />
        <label htmlFor="hobby4">Traveling</label>
        <input
          type="checkbox"
          id="hobby5"
          value="Sports"
          {...register("hobbies")}
        />
        <label htmlFor="hobby5">Sports</label>
        {!!errors.hobbies && <p>{errors.hobbies.message}</p>}
      </div>
      <div>
        <label>Select a City:</label>
        <select {...register("city")}>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
        {!!errors.city && <p>{errors.city.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
