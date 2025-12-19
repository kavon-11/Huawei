import { FaQuestionCircle } from "react-icons/fa";

export default function TimelineStepper() {
  return (
    <div className="flex flex-col justify-between ">
      <ol class="relative text-body border-s border-default mt-32 h-fit mx-16">
        <li class="mb-10 ms-7">
          <span class="absolute flex items-center justify-center w-8 h-8 text-fg-success-strong bg-success-soft rounded-full -start-4 ring-4 ring-buffer">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5Z"
              />
            </svg>
          </span>
          <h3 class="font-medium leading-tight">Choose a shop system</h3>
          <p class="text-sm">What is the system of your store</p>
        </li>
        <li class="mb-10 ms-7">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-neutral-tertiary text-body rounded-full -start-4 ring-4 ring-buffer">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5Z"
              />
            </svg>
          </span>
          <h3 class="font-medium leading-tight">Provide Industry</h3>
          <p class="text-sm">What is your industry of store</p>
        </li>
        <li class="mb-10 ms-7">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-neutral-tertiary text-body rounded-full -start-4 ring-4 ring-buffer">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </span>
          <h3 class="font-medium leading-tight">Provide domain</h3>
          <p class="text-sm">Provide your primary domain</p>
        </li>
        <li class="mb-10 ms-7">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-neutral-tertiary text-body rounded-full -start-4 ring-4 ring-buffer">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </span>
          <h3 class="font-medium leading-tight">Connect google accounts</h3>
          <p class="text-sm">
            Google ads, google analytics, google tag manager, etc...
          </p>
        </li>
        <li class="ms-7">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-neutral-tertiary text-body rounded-full -start-4 ring-4 ring-buffer">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </span>
          <h3 class="font-medium leading-tight">Add product url</h3>
          <p class="text-sm">Dummy text of the printing</p>
        </li>
      </ol>

      {/* Contact Us */}
      <div className="flex flex-col items-center m-10 mx-16">
        <FaQuestionCircle className="w-12 h-12 text-neutral-tertiary mb-4" />
        <h3 className="font-medium leading-tight mb-2">Need Help?</h3>
        <p className="text-sm text-center mb-4">
          If you're having any issues, feel free to contact us. We're here to
          assist you every step of the way.
        </p>
        <button className="bg-black text-white px-4 py-2 rounded">
          Contact Us
        </button>
      </div>
    </div>
  );
}
