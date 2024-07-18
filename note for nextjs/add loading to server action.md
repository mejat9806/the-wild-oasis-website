for form server action use the useFormStatus from react dom
to use the useFromStatus the useFromStatus need to be render by the form meaning it has to a component in the form
const { status, pending, data } = useFormStatus();
//the useFormStatus need to be render by the form
return
button
className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
disabled={pending} >
{!pending ? "Update profile" : "Updating..."}
button>

for onclick handler use the useTransition from react dom

const [isPending, startTransition] = useTransition();
// function deleteReservation() {
// "use server";
// } // this is for server actions in server components
function handleDeleteReservation() {
if (confirm("Are you sure you want to delete")) {
startTransition(() => deleteReservation(bookingId));
}
}
