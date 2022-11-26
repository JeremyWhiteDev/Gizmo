//

const dbUrl = "http://localhost:8088";

// ----------------------------- Gizmo db fetch -------------------------------

//the problem: I need to get a users uid and use that to expand on the gizmo data.

export const getPaginatedGizmosAndLocations = async (
  pageNumber,
  sortby,
  limit
) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos?_expand=gizmoCategory&_expand=user&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getGizmoQty = async () => {
  const gizmoResponse = await fetch(`${dbUrl}`);
  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));
  return gizmoLength;
};

export const getSingleGizmo = async (gizmoId) => {
  const gizmoResponse = await fetch(`${dbUrl}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getUserGizmos = async () => {
  const gizmoResponse = await fetch(`${dbUrl}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const updateUserGizmo = async (gizmoId) => {
  const gizmoResponse = await fetch(`${dbUrl}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const deleteUserGizmo = async (gizmoId) => {
  const gizmoResponse = await fetch(`${dbUrl}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

// ----------------------------- user db fetch -------------------------------

export const getSingleUserInfo = async (uid) => {
  const gizmoResponse = await fetch(`${dbUrl}/users/uid=${uid}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

ex;
