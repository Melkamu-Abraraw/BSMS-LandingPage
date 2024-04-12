const BASE_URL = "http://localhost:3000/";

// single user
export async function getEmployee(empId) {
  const empResponse = await fetch(`${BASE_URL}/api/workers/${empId}`);
  const json = await empResponse.json();
  if (json) return json;
  return {};
}
// all user
export async function getEmployees() {
  const empResponses = await fetch(`${BASE_URL}/api/workers`);
  const json = await empResponses.json();

  return json;
}
//posting a new user
// export async function createEmployee(formData) {
//   try {
//     const Options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     };

//     const empResponse = await fetch(`${BASE_URL}/api/workers`, Options);
//     const json = await empResponse.json();

//     return json;
//   } catch (error) {
//     return error;
//   }
// }
export async function createEmployee(formData) {
  try {
    const formDataToSend = new FormData();

    // Append form data
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Append image files
    formDataToSend.append("EmpAvator", formData.EmpAvator);
    formDataToSend.append("RelAvator", formData.RelAvator);

    const Options = {
      method: "POST",
      body: formDataToSend,
    };

    const empResponse = await fetch(`${BASE_URL}/api/workers`, Options);
    const json = await empResponse.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a new user
export async function updateEmployee(empId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const empResponse = await fetch(`${BASE_URL}/api/workers/${empId}`, Options);
  const json = await empResponse.json();
  return json;
}

// Delete a new user
export async function deleteEmployee(empId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const empResponse = await fetch(`${BASE_URL}/api/workers/${empId}`, Options);
  const json = await empResponse.json();
  return json;
}
