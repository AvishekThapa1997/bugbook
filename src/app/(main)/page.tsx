import { getLoggedInUser } from "../(auth)/_service";
import { ProtectedPage } from "../_components/common/ProtectedPage";

export default async function Home() {
  const { data, error } = await getLoggedInUser();
  return (
    <ProtectedPage>
      <pre>{data ? JSON.stringify(data, null, 2) : JSON.stringify(error)}</pre>
    </ProtectedPage>
  );
}
