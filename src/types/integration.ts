export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  labels: string[];
  params?: { name: string; label: string; type: string; required: boolean }[];
  minimum_plan?: string;
  is_marketing_stunt?: boolean;
}

export interface Tool {
  provider_id: string;
  name: string;
  icon: string;
  tags: string[];
  actions: {
    action_id: string;
    name: string;
    description: { human: string };
    input_params: {
      name: string;
      label: string;
      type: string;
      human_description: string;
    }[];
    output_params: {
      name: string;
      label: string;
      type: string;
      human_description: string;
    }[];
  }[];
}
