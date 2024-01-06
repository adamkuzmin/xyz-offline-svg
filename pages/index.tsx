import FolderUploader from "@/components/uploader/uploader";
import Viewer from "@/components/viewer/viewer";
import Head from "next/head";
import Image from "next/image";

import Split from "react-split";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Split
        sizes={[20, 80]}
        minSize={40}
        snapOffset={80}
        gutterSize={5}
        className="split"
        direction="horizontal"
      >
        <FolderUploader />

        <Viewer />
      </Split>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
  & > div {
    display: flex;
  }

  & .gutter {
    background-color: #474747;
    cursor: col-resize;

    &:hover {
      background-color: #ffde14;
    }
  }
`;

export default Home;
