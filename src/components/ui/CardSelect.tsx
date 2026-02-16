export type CardOption = {
	value: string;
	label: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
};

type CardSelectProps = {
	name: string;
	value: string;
	options: CardOption[];
	setFieldValue: (field: string, value: string) => void;
};

const CardSelect = ({
	name,
	value,
	options,
	setFieldValue,
}: CardSelectProps) => {
	const getGridCols = () => {
		switch (options.length) {
			case 1:
				return "grid-cols-1";
			case 2:
				return "md:grid-cols-2";
			case 3:
				return "md:grid-cols-3";
			case 4:
				return "md:grid-cols-2 xl:grid-cols-4";
			default:
				return "md:grid-cols-3";
		}
	};

	return (
		<div className={`grid grid-cols-1 ${getGridCols()} gap-3`}>
			{options.map((opt) => {
				const active = value === opt.value;
				const Icon = opt.icon;

				return (
					<button
						type="button"
						key={opt.value}
						onClick={() => setFieldValue(name, opt.value)}
						className={`
							group text-left p-4 rounded-xl border transition-all duration-200
							${
								active
									? "bg-[#00b6b7]/10 border-2 border-[#00b6b7] shadow-md scale-[1.01]"
									: "bg-white border-gray-200 hover:border-[#00b6b7]/40"
							}
						`}>
						<div className="flex items-start gap-3">
							{Icon && (
								<div
									className={`
										w-9 h-9 flex items-center justify-center rounded-lg transition font-bold
										${active ? "bg-[#00b6b7] text-white" : "bg-[#F3F2E7] text-[#00b6b7]"}
									`}>
									<Icon className="text-sm" />
								</div>
							)}

							<div>
								<p className="font-medium text-gray-900">{opt.label}</p>
								{opt.description && (
									<p className="text-sm text-gray-600">{opt.description}</p>
								)}
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
};

export default CardSelect;
