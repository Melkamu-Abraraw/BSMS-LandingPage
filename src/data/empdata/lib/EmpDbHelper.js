const BASE_URL = "http://localhost:3000/";

// all user
export const getEmps = async () => {
  const empResponses = await fetch(`${BASE_URL}/api/workers`);
  const json = await empResponses.json();

  return json;
};

// single user
export const getEmp = async (empId) => {
  const empResponse = await fetch(`${BASE_URL}/api/workers/${empId}`);
  const json = await empResponse.json();
  if (json) return json;
  return {};
};

// posting a new user
export async function addEmp(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const empResponse = await fetch(`${BASE_URL}/api/workers`, Options);
    const json = await empResponse.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a new user
export async function updateEmp(empId, formData) {
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
export async function deleteEmp(empId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const empResponse = await fetch(`${BASE_URL}/api/workers/${empId}`, Options);
  const json = await empResponse.json();
  return json;
}
