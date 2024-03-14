import HeaderContext from "@/components/HeaderContext";
import getSession from "@/libs/session/getSession";


export default async function Page() {
  const headerContent: [string, string] = ["Settings", `Configure your account.`];

  const session = getSession();

  return <>
    <HeaderContext setTo={headerContent} />
    <div className="flex flex-col gap-2 bg-base-200 w-fit rounded-lg p-4">
      <h2>Are you sure you want to delete your MCCade Account?</h2>
      <div>Please enter your password to confirm.</div>
      <form className="flex flex-col gap-2">
        <input className="text-lg rounded-lg" type="password" name="pass" placeholder="Password" />
        <button className="btn w-fit bg-red-800 hover:bg-red-900 text-lg px-3 rounded-lg" type="submit">
          Delete my Account
        </button>
      </form>
    </div>
  </>
}
