import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Viewer: React.FC = () => {
  const viewerDiv = useRef<HTMLDivElement>(null);

  const [isViewerInitialized, setIsViewerInitialized] = useState(false);
  const [viewer, setViewer] = useState<any>(null);

  const initializeViewer = async () => {
    const Autodesk = (window as any).Autodesk;
    const forgeToken: any = await getForgeToken();

    if (!forgeToken || isViewerInitialized) return;

    async function getForgeToken(): Promise<ForgeTokenResponse | null> {
      try {
        const response = await axios.get<ForgeTokenResponse>(
          "/api/forge/oauth/public"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching Forge token:", error);
        return null;
      }
    }

    const options: any = {
      env: "AutodeskProduction",
      api: "derivativeV2",
      getAccessToken: (onTokenReady: any) => {
        onTokenReady(forgeToken.access_token, forgeToken.expires_in);
      },
    };

    Autodesk.Viewing.Initializer(options, () => {
      const newViewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv.current);
      newViewer.start();

      setViewer(newViewer);
      setIsViewerInitialized(true);
    });
  };

  useEffect(() => {
    initializeViewer();
  }, []);

  return (
    <Wrapper>
      <div ref={viewerDiv} style={{ backgroundColor: "lightgray" }}></div>
    </Wrapper>
  );
};

interface ForgeTokenResponse {
  access_token: string;
  expires_in: number;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    height: 100vh;
    width: 100%;

    display: flex;
    position: relative;

    /* & > * {
      width: 100%;
    } */
  }
`;

export default Viewer;
