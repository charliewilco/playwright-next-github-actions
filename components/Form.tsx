import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import produce from "immer";

type PersonForm = {
  name: string;
  city: string;
  age: number;
};

export const defaultValues: PersonForm = {
  name: "",
  city: "Seattle",
  age: 24,
};

interface IFormProps {
  create?: boolean;
  initialValues: PersonForm;
  formId: string;
}

interface IFormState {
  message: string | null;
  errors: Partial<Record<keyof PersonForm, string>>;
  form: PersonForm;
}

export const Form: React.VFC<IFormProps> = ({
  formId,
  initialValues,
  create = true,
}) => {
  const router = useRouter();
  const contentType = "application/json";

  const [{ form, message, errors }, setState] = useState<IFormState>({
    message: null,
    errors: {},
    form: {
      ...initialValues,
    },
  });

  const putData = async (form: PersonForm) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/people/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/people/${id}`, data, false);
      router.push("/");
    } catch (error) {
      setState(
        produce((draft) => {
          draft.message = "Failed to add person";
        })
      );
    }
  };

  const postData = async (form: PersonForm) => {
    try {
      const res = await fetch("/api/people", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      setState(
        produce((draft) => {
          draft.message = "Failed to add person";
        })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name as keyof PersonForm;
    setState(
      produce((draft) => {
        draft.message = null;
        return {
          ...draft,
          form: {
            ...draft.form,
            [name]: value,
          },
        };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      create ? postData(form) : putData(form);
    } else {
      setState(
        produce((draft) => {
          draft.errors = errs;
        })
      );
    }
  };

  const formValidate = (): Partial<Record<keyof PersonForm, string>> => {
    let err: any = {};
    if (!form.name) err.name = "Name is required";
    if (!form.age) err.age = "Age is required";
    if (!form.city) err.city = "City is required";
    return err;
  };

  return (
    <div className="root">
      <form id={formId} onSubmit={handleSubmit}>
        <div className="grid">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              maxLength={20}
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors["name"] && <span className="error">{errors["name"]}</span>}
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              maxLength={20}
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />

            {errors["city"] && <span className="error">{errors["city"]}</span>}
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
            {errors["age"] && <span className="error">{errors["age"]}</span>}
          </div>
        </div>
        <div className="tray">
          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <p data-testid="RESPONSE_MESSAGE">{message}</p>}

      <style jsx>{`
        .root {
          display: block;
          font-size: 1rem;
          border-radius: 0.5rem;
          background: var(--surface);
          padding: 1rem;
        }

        .grid {
          --columns: 12;
          display: grid;
          grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
          gap: 1rem;
        }

        label {
          display: block;
          font-family: var(--monospace);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        input {
          width: 100%;
          display: block;
          padding: 0.5rem;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          font-family: var(--sans-serif);
          background: var(--surface);
          border: 1px solid var(--bg);
          color: inherit;
        }

        input:focus {
          border-color: var(--highlight);
        }

        button {
          background: var(--highlight);
          padding: 0.5rem 1rem;
          font-family: var(--sans-serif);
          color: var(--fg);
          font-weight: 700;
          font-size: 1rem;
          border: 0;
          border-radius: 0.5rem;
        }

        span.error {
          color: red;
          font-size: 0.875rem;
          display: block;
          padding: 0.5rem;
        }

        .grid > div {
          grid-column: span 6 / span 6;
        }

        .tray {
          padding-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};
