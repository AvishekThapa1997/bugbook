export const dynamic = "force-dynamic";
import { ProtectedPage } from "../_components/ProtectedPage";
import { PostServiceAdapterProvider } from "./_provider";
import { PostPageContent } from "./PostPageContent";

export default async function Home() {
  return (
    <ProtectedPage>
      <PostServiceAdapterProvider>
        <PostPageContent />
      </PostServiceAdapterProvider>
    </ProtectedPage>
  );
}
