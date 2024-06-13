import { useRouter } from "next/router";

export default function Error({ params }) {
  const router = useRouter();
  const { error } = router.query;

  // router.push({
  //     pathname: '/',
  //     query: { error: error }
  // });

  return <div>Error</div>;
}
