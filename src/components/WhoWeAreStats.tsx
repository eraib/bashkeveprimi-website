const WhoWeAreStats = () => {
	return (
		<div className="flex items-center justify-center">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl rounded-lg overflow-hidden m-2 sm:m-4 mx-auto">
				<div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-white">
					<h1 className="text-[#00cfd0] text-3xl sm:text-4xl md:text-5xl font-bold">
						1.2k+
					</h1>
					<div className="w-12 h-0.5 rounded-4xl bg-black my-2 sm:my-3"></div>
					<p className="text-xs sm:text-sm md:text-base">Projects Completed</p>
				</div>

				<div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-white">
					<h1 className="text-[#00cfd0] text-3xl sm:text-4xl md:text-5xl font-bold">
						850+
					</h1>
					<div className="w-12 h-0.5 rounded-4xl bg-black my-2 sm:my-3"></div>
					<p className="text-xs sm:text-sm md:text-base">Monthly Donate</p>
				</div>

				<div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-white">
					<h1 className="text-[#00cfd0] text-3xl sm:text-4xl md:text-5xl font-bold">
						320+
					</h1>
					<div className="w-12 h-0.5 rounded-4xl bg-black my-2 sm:my-3"></div>
					<p className="text-xs sm:text-sm md:text-base">Donations Received</p>
				</div>

				<div className="bg-[#00A5A6] flex flex-col items-start justify-center text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
					<h1 className="text-white text-base sm:text-md text-left md:text-xl lg:text-2xl font-semibold">
						Our Goal is to Help Poor People
					</h1>
					<p className="text-white mt-2 cursor-pointer text-xs sm:text-sm md:text-base">
						Become a volunteer
					</p>

					<div className="w-12 sm:w-16 h-0.5 rounded-4xl bg-black my-2 sm:my-3 self-start"></div>
				</div>
			</div>
		</div>
	);
};

export default WhoWeAreStats;
